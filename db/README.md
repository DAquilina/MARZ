# Basic DB Structure

```text
 --------------------
| Customer           |
 --------------------
| CustomerID         | ----,     --------------------
| CustomerFirstName  |     '    | Orders             |
| CustomerLastName   |     '     --------------------
 --------------------      '    | OrderID            |
                           '    | OrderStatus        |
 --------------------      '    | OrderStatus        |
| Product            |     '--> | CustomerID         |
 --------------------    ,----> | ProductID          |
| ProductID          | --'       --------------------
| ProductName        |
| ProductPhotoURL    |
| ProductStatus      |
 --------------------
```
