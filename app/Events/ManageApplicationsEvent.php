<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ManageApplicationsEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $notification;
    public $data;
    public $HR;

    public function __construct($notification,  $HR, $data)
    {
        $this->notification = $notification;
        $this->HR = $HR;
        $this->data = $data;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $channels = [];
        $channels[] = new PrivateChannel('HR-channel.' . $this->HR);
        return $channels;
    }
    public function broadcastWith()
    {
        $employee=['fname' => $this->data['fname'], 'lname' => $this->data['lname']];
        return ['message' => $this->notification,'employee' =>  $employee, 'data' => $this->data];
    }
}
