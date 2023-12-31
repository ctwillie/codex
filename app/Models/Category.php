<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Class Category
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Collection|resource[] $resources
 * @property Collection|Technology[] $technologies
 */
class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'description',
        'name',
    ];

    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

    public function technologies(): HasMany
    {
        return $this->hasMany(Technology::class);
    }
}
