<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PoleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'title' => $this->title,
            'director' => new DirectorResource($this->whenLoaded('director')),
            'commune' => $this->commune,
            'wilaya' => $this->wilaya,
            'last_submission' => $this->last_submission,
            'nts' => NTResource::collection($this->whenLoaded('nts')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}