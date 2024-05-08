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

class VacationRequestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;
    public $employee;
    public $request;

   public function __construct($message, $employee, $request)
    {
        $this->message = $message;
        $this->employee = $employee;
        $this->request = $request;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        $channels = [];
        $HRemployees = User::whereHas('roles', function ($query) {
            $query->where('name', 'hr');
        })->pluck('id');       
        
        foreach ($HRemployees as $HRemployee) {
                $channelName = 'vacation-request-channel.' . $HRemployee;
                $channels[] = new PrivateChannel($channelName);
        }
        return $channels;
    }

    public function broadcastWith()
    {
        return ['message' => $this->message, 'employee' => $this->employee, 'request' => $this->request];
    }
}
