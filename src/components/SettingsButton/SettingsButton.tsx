import { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Adjustments as AdjustmentsIcon } from '../../icons/adjustments';
import { useRouter } from 'next/router';

// import { SettingsDrawer } from './settings-drawer';

const SettingsButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter()

  const handleOpen = (): void => {
    setOpen(true);
    router.push('/settings')
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      
      <Tooltip title="Settings">
        <Fab
          color="primary"
          onClick={handleOpen}
          size="medium"
          sx={{
            bottom: 0,
            margin: (theme) => theme.spacing(4),
            position: 'fixed',
            right: 0,
            zIndex: 1900
          }}
        >
          <AdjustmentsIcon fontSize="small" />
        </Fab>
      </Tooltip>
      {/* <SettingsDrawer
        onClose={handleClose}
        open={open}
      /> */}
    </>
  );
};

export default SettingsButton
