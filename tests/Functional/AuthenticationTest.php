<?php

namespace App\Tests\Functional;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Tests\TestUtilitiesTrait;
use Hautelook\AliceBundle\PhpUnit\ReloadDatabaseTrait;

class AuthenticationTest extends ApiTestCase
{
    use ReloadDatabaseTrait;
    use TestUtilitiesTrait;

    public function testLogin(): void
    {
        $client = self::createClient();

        $user = $this->createUserInDB('test@foo.com', 'test', 'bar');

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'json' => [
                'username' => 'test@foo.com',
                'password' => 'bar',
            ],
        ]);
        $this->assertResponseIsSuccessful('Login by email/password');

        $response = $client->request('POST', '/authentication_token', [
            'json' => [
                'username' => 'test',
                'password' => 'bar',
            ],
        ]);
        $this->assertResponseIsSuccessful('Login by username/password');

        $json = $response->toArray();
        $this->assertArrayHasKey('token', $json);

        $client->request('GET', '/api/users/'.$user->getId());
        $this->assertResponseStatusCodeSame(401, 'Request shoud be NOT authorized!');

        $client->request('GET', '/api/users/'.$user->getId(), ['auth_bearer' => $json['token']]);
        $this->assertResponseIsSuccessful('Request shoud be Authorized!');
        $this->assertJsonContains([
            'email' => 'test@foo.com',
        ]);
    }
}
