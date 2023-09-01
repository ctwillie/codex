<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        'is_official' => 'bool',
    ];

    protected $fillable = [
        'category_id',
        'is_official',
        'name',
        'technology_id',
        'url',
    ];

    /**
     * Relationships
     */
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

    /**
     * Scopes
     */
    public function scopeFiltered(Builder $query, array $searchFilters)
    {
        $isOfficial = $searchFilters['isOfficial'] ?? null;
        $search = $searchFilters['search'] ?? null;
        $categoryId = $searchFilters['categoryId'] ?? null;
        $technologyId = $searchFilters['technologyId'] ?? null;

        if (! empty($isOfficial) && $isOfficial === 'true') {
            $query->where('is_official', 1);
        }

        if (! empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

        if (! empty($categoryId) && ! empty($technologyId)) {
            $query->where(function ($query) use ($categoryId, $technologyId) {
                $query->whereHas('category', function ($q) use ($categoryId) {
                    $q->where('uuid', $categoryId);
                })->orWhereHas('technology', function ($query) use ($technologyId) {
                    $query->where('uuid', $technologyId);
                });
            });
        }

        if (! empty($categoryId) && empty($technologyId)) {
            $query->whereHas('category', function ($q) use ($categoryId) {
                $q->where('uuid', $categoryId);
            });
        }

        if (! empty($technologyId) && empty($categoryId)) {
            $query->whereHas('technology', function ($q) use ($technologyId) {
                $q->where('uuid', $technologyId);
            });
        }
    }
}
