<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DirectorResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'poles' => PoleResource::collection($this->whenLoaded('poles')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}