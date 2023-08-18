<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class ResourceTag
 *
 * @property int $resource_id
 * @property int $tag_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property resource $resource
 * @property Tag $tag
 */
class ResourceTag extends Model
{
    protected $table = 'resource_tag';

    public $incrementing = false;

    protected $casts = [
        'resource_id' => 'int',
        'tag_id' => 'int',
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
