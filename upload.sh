#!/bin/bash
rm -rf upload.zip
zip -r upload.zip * -x upload.sh

jaws --profile pstaging lambda update-function-code --function-name ads-lambda --zip-file fileb://$PWD/upload.zip