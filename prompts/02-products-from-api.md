On the home page.tsx I show featured 4 products from the API through `GET /api/products?per_page=4`

The API URL is set in the .env.local as NEXT_PUBLIC_API_URL

Extract the FeaturedProducts and ProductCard from page.tsx into separate components.

In FeaturedProducts, replace hard-coded products with values from the API. Change the Product type structure according to API structure.

Do not ask to run `npm run dev` or `npm run build` at the end, `npm run dev` is already running.

The example returned structure from API is this:
```
{
    "data": [
        {
            "name": "City Cruiser Stroller",
            "slug": "city-cruiser-stroller",
            "description": "Expedita unde est earum voluptatum provident. Aut esse velit necessitatibus incidunt necessitatibus officiis. Nihil eum perspiciatis nesciunt aliquid sed sint. Excepturi ad mollitia voluptatem numquam.\n\nDolores aut iure labore porro delectus praesentium esse. Doloremque expedita voluptas illo amet. Dolores consequuntur et autem eum autem aut.",
            "image_url": "https://placehold.co/1200x900/green/white?text=City\nCruiser\nStroller",
            "daily_rate": 18,
            "category": "strollers",
            "is_active": true,
            "units_count": 3
        },
        {
            "name": "Comfort Ride Infant Seat",
            "slug": "comfort-ride-infant-seat",
            "description": "Error rerum dignissimos molestias. Vel voluptas aliquam tempora sint. Placeat architecto blanditiis non quidem quo accusantium. Libero iusto voluptates consequatur ea.\n\nEt nobis libero nihil est ea occaecati dolor. Voluptatibus magnam sint neque itaque alias unde. Et maiores facere et et consequatur sunt. Voluptas suscipit quaerat libero et exercitationem commodi earum. Fugit sed omnis est minus quia.",
            "image_url": "https://placehold.co/1200x900/purple/white?text=Comfort\nRide\nInfant\nSeat",
            "daily_rate": 12,
            "category": "car_seats",
            "is_active": true,
            "units_count": 2
        },
        {
            "name": "Compact Travel Stroller",
            "slug": "compact-travel-stroller",
            "description": "Possimus quod magnam dolorum natus aut sed suscipit. Et perferendis totam numquam pariatur. Animi laborum et eaque voluptas. Dolorum voluptatem dolorum odit similique molestiae et.\n\nInventore libero repellat est est quidem consequuntur soluta. Sint at ut aliquid aut. Recusandae id laborum et fuga.",
            "image_url": "https://placehold.co/1200x900/red/white?text=Compact\nTravel\nStroller",
            "daily_rate": 16,
            "category": "strollers",
            "is_active": true,
            "units_count": 2
        },
        {
            "name": "Dream Nest Crib",
            "slug": "dream-nest-crib",
            "description": "Ipsam enim inventore consequuntur quam. Enim odio veritatis commodi sed unde adipisci. Illum fugiat incidunt expedita et quia minima.\n\nPariatur esse enim porro quo voluptatem. Et ratione neque quaerat ut.",
            "image_url": "https://placehold.co/1200x900/red/white?text=Dream\nNest\nCrib",
            "daily_rate": 17,
            "category": "cribs",
            "is_active": true,
            "units_count": 3
        }
    ],
    "links": {
        "first": "http://babygear.test/api/products?per_page=4&page=1",
        "last": "http://babygear.test/api/products?per_page=4&page=2",
        "prev": null,
        "next": "http://babygear.test/api/products?per_page=4&page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 2,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "page": null,
                "active": false
            },
            {
                "url": "http://babygear.test/api/products?per_page=4&page=1",
                "label": "1",
                "page": 1,
                "active": true
            },
            {
                "url": "http://babygear.test/api/products?per_page=4&page=2",
                "label": "2",
                "page": 2,
                "active": false
            },
            {
                "url": "http://babygear.test/api/products?per_page=4&page=2",
                "label": "Next &raquo;",
                "page": 2,
                "active": false
            }
        ],
        "path": "http://babygear.test/api/products",
        "per_page": 4,
        "to": 4,
        "total": 8
    }
}
```