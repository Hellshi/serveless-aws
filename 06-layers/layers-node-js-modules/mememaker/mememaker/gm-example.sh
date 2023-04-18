#gm identify -verbose ./app/resources/homer.jpg

gm convert \
    ./app/resources/homer.jpg \
    -font ./app/resources/impact.ttf \
    -pointsize 50 \
    -fill "#FFF" \
    -stroke "#000" \
    -strokewidth 1 \
    -draw "gravity center text 0,-155 \"Quando\"" \
    -draw "gravity center text 0,155 \"seu código roda\"" \
    output.png

echo "done"