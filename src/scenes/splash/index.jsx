import React from 'react'

function Splash() {
  return (
    <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', component: 'span', color: '#f6f3eb', minHeight: '100vh', minwidth: '98vw', alignItems: "center", textAlign: "center", justifyContent: "center", padding: '10px' }} >
        <Typography variant="h1" component="h2">
          Welcome
        </Typography>
        <Button sx={{ variant: "outlined", bgcolor: '#e42800', color: '#f6f3eb', padding: '10px' }}>Let's Begin!</Button>
      </Box>
    </div>
  )
}

export default Splash