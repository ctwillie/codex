<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * Class Resource
 *
 * @property int $id
 * @property int $category_id
 * @property int $technology_id
 * @property bool $is_official
 * @property string $name
 * @property string $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Category $category
 * @property Technology $technology
 * @property Collection|Tag[] $tags
 */
class Resource extends Model
{
    use HasFactory;

    protected $table = 'resources';

    protected $casts = [
        'category_id' => 'int',
        'is_official' => 'bool',
        'technology_id' => 'int',
    ];

    protected $fillable = [
        'category_id',
        'is_official',
        'name',
        'technology_id',
        'url',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function technology(): BelongsTo
    {
        return $this->belongsTo(Technology::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)
            ->withTimestamps();
    }
}
