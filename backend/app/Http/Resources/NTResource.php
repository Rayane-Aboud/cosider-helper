<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NTResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'pole_id' => $this->pole_id,
            'code' => $this->code,
            'title' => $this->title,
            'pole' => new PoleResource($this->whenLoaded('pole')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}