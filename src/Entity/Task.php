<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TaskRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"task:read"}},
 *     denormalizationContext={"groups"={"task:write"}},
 * )
 */
class Task
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"task:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"todo:read", "task:read", "todo:write", "task:write"})
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity=TodoList::class, inversedBy="tasks")
     * @ORM\JoinColumn(nullable=false)
     *
     * @SerializedName("todo")
     * @Groups({"task:read"})
     */
    private $todoList;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getTodoList(): ?TodoList
    {
        return $this->todoList;
    }

    public function setTodoList(?TodoList $todoList): self
    {
        $this->todoList = $todoList;

        return $this;
    }

    /**
     * @Groups({"task:read"})
     */
    public function getOwner(): ?User
    {
        return $this->todoList->getOwner();
    }
}
