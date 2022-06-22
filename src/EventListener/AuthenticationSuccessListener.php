<?php

namespace App\EventListener;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessListener
{

  public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
  {
      $data = $event->getData();
      $user = $event->getUser();

      if (!$user instanceof UserInterface) {
          return;
      }

      $data['id'] = $user->getId();
      $data['email'] = $user->getEmail();
      $data['username'] = $user->getUsername();
      $data['roles'] = $user->getRoles();

      $event->setData($data);
  }
}
