# Getting the live database
- Export and import database live to local. Two steps, one for the domain, one for protocol.
- run from public: ```wp search-replace "tandimo.com" "tandimo.test" ```
- run from public: ```wp search-replace "https://tandimo.test" "http://tandimo.test"```

# PO Migration
- Check how many are remaining to be processed:
```
"SELECT * FROM lg8z_impresario_cost WHERE is_deleted=0
AND status IS NULL;"


- Merge all branches for po work - do plugin impresario last
- Keep increasing the cost installer number until all costs are migrated
- Remove call to PO migrator in code - commit.
```


# [Impresario Base Theme]

This must be run with NVM at version 10

```
nvm use 10
```

Then 
```npm i```

To Build the styles, use 

```
./node_modules/.bin/gulp
```

Which uses the gulpfile.js and runs the default watch.


## Project Totals 

### Total Net Sell 
Total of "value" for variations
### Total Net Cost
The total of all "Net cost" values for variations.
### Amount Invoiced
The total of "value" for all sales invoices.

### Total Actual Cost
The total of "po_item_total" for all cost (purchase order) items

### Invoice Amount Remaining
Total Net Sell - Amount Invoiced
### Profit
Total Net Sell - Total Net Cost

### Actual Profit
Total Net Sell - Total Actual Cost

### Actual Margin
Actual Profit / Total Net Sell

### GP
(Profit / Total Net Sell) * 100