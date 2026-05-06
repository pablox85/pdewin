#!/bin/bash

i=1

for f in *.jpeg; do
  printf -v num "%03d" "$i"   # 001, 002, 003...
  mv -n -- "$f" "det$num.jpeg"
  ((i++))
done

echo "Listo."
