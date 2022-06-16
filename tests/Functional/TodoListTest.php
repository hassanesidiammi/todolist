<?php

namespace App\Tests\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Response;
use App\Entity\TodoList;
use App\Tests\TestUtilitiesTrait;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class TodoListTest extends ApiTestCase
{
    use ReloadDatabaseTrait;
    use TestUtilitiesTrait;

    const USER = ['email' => 'test@foo.com', 'username' => 'test', 'password' => 'bar'];
    const TODO = [
        'title'       => 'First todo',
        'description' => 'First todo long description long description long description long description...',
        'owner_path'  => '/api/users/'
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

    private function createUserAndGetJWToken($client): array
    {
        return $this->createUserAndJWToken($client, self::USER['email'], self::USER['username'], self::USER['password']);
    }

    private function createTodoList($title, $description, $user): TodoList
    {
        return $this->createTodoListInDB($title, $description, $user);
    }
}
