<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ManageDepartmentEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $action;
    public $notification;
    public $data;
    public $actionHrId;

    public function __construct($action, $notification,  $actionHrId, $data)
    {
        $this->action = $action;
        $this->notification = $notification;
        $this->actionHrId = $actionHrId;
        $this->data = $data;
    }

    public function broadcastOn(): array
    {
        $channels = [];
        $HRemployees = User::whereHas('roles', function ($query) {
            $query->where('name', 'hr');
        })->pluck('id');       
        
        foreach ($HRemployees as $HRemployee) {
            if ($HRemployee !== $this->actionHrId) {
                $channelName = 'HR-channel.' . $HRemployee;
                $channels[] = new PrivateChannel($channelName);
            }
        }
        return $channels;
    }

    public function broadcastWith()
    {   
        // $this->data->announcement->load('departement');
        $hr=User::find($this->actionHrId);
        $hr=['id'=>$hr->id, 'fname'=>$hr->fname, 'lname'=>$hr->lname];
        return ['action' => $this->action, 'message' => $this->notification, 'employee' => $hr, 'data' => $this->data];
    }
}
?>