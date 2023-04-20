import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function Posts() {
  const cardData = [
    { title: "Card 1", content: "Detta är mitt inlägg som jag skriver här 1" },
    { title: "Card 2", content: "Detta är mitt inlägg som jag skriver här 2" },
    { title: "Card 3", content: "TDetta är mitt inlägg som jag skriver här 3" },
    { title: "Card 4", content: "Detta är mitt inlägg som jag skriver här 4" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {cardData.map((card) => (
        <Paper
          key={card.title}
          elevation={2}
          sx={{
            p: 7,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <h4>{card.title}</h4>
          <p>{card.content}</p>
        </Paper>
      ))}
    </Box>
  );
}
