<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VacationResponseEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;
    public $employee;
    public $request;
    public $receiver;

   public function __construct($message, $employee, $request, $receiver)
    {
        $this->message = $message;
        $this->employee = $employee;
        $this->request = $request;
        $this->receiver = $receiver;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $channels = [];
        $channels[] = new PrivateChannel('employee-channel.' . $this->receiver);
        return $channels;
    }
    public function broadcastWith()
    {
        return ['message' => $this->message, 'employee' => $this->employee, 'absence' => $this->request];
    }
}
