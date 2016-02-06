# Pocci
A proof of concept. For making this more enjoyable.

# Querying Site specific data

To query site specific data you must either add `?site=<site_slug>` to your request query string or pass in the
value `{where: {siteSlug: <site_slug>}}` as a [filter](https://docs.strongloop.com/display/public/LB/Where+filter) in your query string.

# Development Seed

The development seed contains the following pre-populated values:

Credentials
```json
{
  "email": "admin@pocci.com",
  "password": "admin"
}
```

Site
```json
{
  "domain": "localhost",
  "slug": "development",
  "displayName": "Default Development Site",
  "default": true,
  "id": 2
}
```

There is also pre-populated articles and pages. You can view them in the [API explorer](https://docs.strongloop.com/display/public/LB/Use+API+Explorer)
