<?php

namespace App\Tests\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Response;
use App\Entity\TodoList;
use App\Tests\TestUtilitiesTrait;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class TodoListTest extends ApiTestCase
{
    use ReloadDatabaseTrait;
    use TestUtilitiesTrait;

    const USER = ['email' => 'test@foo.com', 'username' => 'test', 'password' => 'bar'];
    const USER_2 = ['email' => 'test2@foo.com', 'username' => 'test2', 'password' => 'bar'];
    const TODO = [
        'title'       => 'First todo',
        'description' => 'First todo long description long description long description long description...',
        'owner_path'  => '/api/users/'
    ];
    const TASKS = [
        ['title' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'],
        ['title' => 'Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'],
        ['title' => 'Ullamco laboris nisi ut aliquip ex ea commodo consequat'],
        ['title' => 'Duis aute irure dolor in reprehenderit in voluptate'],
        ['title' => 'Excepteur sint occaecat cupidatat non proident'],
    ];
    
    public function testPostTodoList(): void
    {
        $client = self::createClient();

        list($user, $token) = $this->createUserAndGetJWToken($client);

        $client->request('POST', '/api/todos', [
            'auth_bearer' => $token,
            'json' => [
                'title'       => self::TODO['title'],
                'description' => self::TODO['description'],
                'owner'       => self::TODO['owner_path'].$user->getId()
            ]
        ]);
        $this->assertResponseStatusCodeSame(201, 'Create TodoList.');

        $this->assertJsonContains([
            'owner' => '/api/users/'.$user->getId(),
        ]);
    }
    
    public function testGetTodoList(): void
    {
        $client = self::createClient();

        list($user, $token) = $this->createUserAndGetJWToken($client);
        $todo = $this->createTodoList(self::TODO['title'], self::TODO['description'], $user);

        $client->request(
            'GET', '/api/todos/'.$todo->getId(), [
                'auth_bearer' => $token,
            ]
        );
        $this->assertResponseStatusCodeSame(200, 'Get TodoList item.');
        $this->assertJsonContains([
            'owner' => '/api/users/'.$user->getId(),
            'title' => self::TODO['title'],
            'description' => self::TODO['description'],
        ]);
    }
    
    public function testPostTodoListWithTasks(): void
    {
        $client = self::createClient();

        list($user, $token) = $this->createUserAndGetJWToken($client);

        $response = $client->request('POST', '/api/todos', [
            'auth_bearer' => $token,
            'json' => [
                'title'       => self::TODO['title'],
                'description' => self::TODO['description'],
                'owner'       => self::TODO['owner_path'].$user->getId(),
                'tasks'       => self::TASKS,
            ]
        ]);
        $this->assertResponseStatusCodeSame(201, 'Create TodoList.');

        $responseTasks = array_map(function ($task)
        {
            return ['title' => $task['title']];
        }, $response->toArray()['tasks']);

        $this->assertSame($responseTasks, self::TASKS);
    }

    public function testOnlyOwnerCanDelete(): void
    {
        $client = self::createClient();

        list($user1, $token1) = $this->createUserAndGetJWToken($client);
        $todo = $this->createTodoList(self::TODO['title'], self::TODO['description'], $user1, self::TASKS);

        $token2 = $this->createUserAndGetJWToken($client, self::USER_2['email'], self::USER_2['username'], self::USER_2['password'])[1];

        // owner can see his todos
        $client->request('GET', '/api/todos/'.$todo->getId(), [
            'auth_bearer' => $token1,
        ]);
        $this->assertResponseStatusCodeSame(200, 'Show Owner TodoList.');

        $client->request('GET', '/api/todos/'.$todo->getId(), [
            'auth_bearer' => $token2,
        ]);
        $this->assertResponseStatusCodeSame(200, 'Show not owner TodoList.');

        $client->request('DELETE', '/api/tasks/'.$todo->getTasks()->first()->getId(), [
            'auth_bearer' => $token2,
        ]);
        $this->assertResponseStatusCodeSame(403, 'Cannot delete not owned Task.');

        $client->request('DELETE', '/api/todos/'.$todo->getId(), [
            'auth_bearer' => $token2,
        ]);
        $this->assertResponseStatusCodeSame(403, 'Cannot delete not owned TodoList.');

    }

    private function createUserAndGetJWToken($client, $email=self::USER['email'], $username=self::USER['username'], $password=self::USER['password']): array
    {
        return $this->createUserAndJWToken($client, $email, $username, $password);
    }

    private function createTodoList($title, $description, $user, $tasks=null): TodoList
    {
        return $this->createTodoListInDB($title, $description, $user, $tasks);
    }
}
