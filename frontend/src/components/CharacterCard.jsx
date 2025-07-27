import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function ActionAreaCard(props) {
  return (
    <div>
      <Card sx={{ maxWidth: 345,
                  height: 345
       }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.imgurl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {props.brief}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
