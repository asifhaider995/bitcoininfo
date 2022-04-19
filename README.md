# Endpoint Documentation

`localhost:6060` is not a valid endpoint

`localhost:6060/getbitcoininfo` needs to have a parameter named currency, otherwise it will not return values

`localhost:6060/getbitcoininfo?currency=USD` will return values for currency USD

`localhost:6060/getbitcoininfo?currency=EUR` will return values for currency EUR

`localhost:6060/getbitcoininfo?currency=GBR` will not return values because the source api does not provide data for GBR values

Thank you.