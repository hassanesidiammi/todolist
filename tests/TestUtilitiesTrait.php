<?php

declare(strict_types=1);

namespace App\Tests;

use App\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

trait TestUtilitiesTrait
{
    protected function get(string $id)
    {
        return static::getContainer()->get($id);
    }

    protected function getEntityManager()
    {
        return $this->get('doctrine')->getManager();
    }

    protected function save($entity): User
    {
        $em = $this->getEntityManager();
        $em->persist($entity);
        $em->flush();

        return $entity;
    }

    protected function logIn($client, $emailOrUsername, $password, $response=null)
    {
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'username' => $emailOrUsername,
                'password' => $password,
            ],
        ]);

        return $response->toArray()['token'] ?? false;
    }

    protected function createUserInDB($email, $username, $password) {
        $user = new User;
        $user->setEmail($email);
        $user->setUsername($username);
        $password = $this->get(UserPasswordHasherInterface::class)->hashPassword($user, $password);
        $user->setPassword($password);

        return $this->save($user);
    }
}
