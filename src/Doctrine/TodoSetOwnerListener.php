<?php

namespace App\Doctrine;

use App\Entity\TodoList;
use Symfony\Component\Security\Core\Security;

class TodoSetOwnerListener
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function prePersist(TodoList $todo)
    {
      if ($todo->getOwner()) {
        return;
      }

      if ($this->security->getUser()) {
          $todo->setOwner($this->security->getUser());
      }
    }
}
