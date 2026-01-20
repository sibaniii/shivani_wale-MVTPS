import React, { useState } from 'react';
import { Box, Typography, Slider, Button } from '@mui/material';

export default function VoyageReplay({ voyageData = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Voyage Replay</Typography>
      <Slider
        value={currentIndex}
        min={0}
        max={Math.max(voyageData.length - 1, 0)}
        onChange={(e, val) => setCurrentIndex(val)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button variant="outlined" onClick={() => setCurrentIndex(0)}>Reset</Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Current Point: {voyageData[currentIndex]?.timestamp || '—'}
      </Typography>
    </Box>
  );
}