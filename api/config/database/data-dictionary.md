# Dictionnaire de données

## MEDIA

| **Attribut**      | **Type**         |
|-------------------|------------------|
| `id`              | `integer`        |
| `title`           | `string`         |
| `description`     | `string`         |
| `release_date`    | `date`           |
| `media_category`  | `string`         |
| `image_url`       | `string`         |
| `is_validated`    | `boolean`        |

## Recipe

| **Attribut**     | **Type**         |
|------------------|------------------|
| `id`             | `integer`        |
| `title`          | `string`         |
| `ingredient`     | `#FK string`     |
| `instruction`    | `string`         |
| `image_url`      | `string`         |
| `media_id`       | `integer`        |
| `is_validated`   | `boolean`        |

## User

| **Attribut**     |  **Type**        |
|------------------|------------------|
| `id`             | `integer`        |
| `username`       | `string`         |
| `email`          | `string`         |
| `password`       | `string`         |

## RECIPE_HAS_INGREDIENT

|**Attribut**|**Type**|
|-|-|
|`id`|`integer`|
|`recipe_id`|`#FK RECIPE(id)`|
|`ingredient_id`|`#FK INGREDIENT(id)`|

## RECIPE_HAS_PROFIL

|**Attribut**|**Type**|
|-|-|
|`id`|`integer`|
|`recipe_id`|`#FK RECIPE(id)`|
|`profile_id`|`#FK PROFILE(id)`|

## INGREDIENT_HAS_PROFILE

|**Attribut**|**Type**|
|-|-|
|`id`|`integer`|
|`ingredient_id`|`#FK INGREDIENT(id)`|
|`profile_id`|`#FK PROFILE(id)`|

## RECIPE_CATEGORY

|**Attribut**|**Type**|
|-|-|
|`id`|`integer`|
|`recipe_id`|`#RECIPE_CATEGORY(id)`|

## RECIPE SEEN IN

|**Attribut**|**Type**|
|-|-|
|`id`|`integer`|
|`recipe_id`|`#RECIPE_CATEGORY(id)`|
|`media_id`|`#MEDIA_CATEGORY(id)`|
