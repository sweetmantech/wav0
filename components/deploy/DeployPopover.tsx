import { motion } from 'framer-motion';
import { useDeployContext } from '@/providers/DeployProvider';
import DeploySuccess from './DeploySuccess';
import DeployProgress from './DeployProgress';
import DeployCreate from './DeployCreate';

export default function DeployPopover({ onClose }: { onClose: () => void }) {
  const { result, error } = useDeployContext();
  const deploymentInfo = result?.deploymentInfo;
  const isSuccess = deploymentInfo && deploymentInfo.status === 'READY';

  return (
    <>
      {/* Overlay for click-away */}
      <div
        className="fixed inset-0 z-[9998] bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Popover */}
      <motion.div
        key="deploy-verification"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed right-4 top-16 z-[9999] sm:w-[480px] w-[90vw] max-w-[95vw] rounded-lg bg-black text-zinc-50 shadow-xl border border-zinc-800 p-3 flex flex-col gap-4"
        role="dialog"
        aria-modal="true"
      >
        {isSuccess ? (
          <DeploySuccess deploymentInfo={deploymentInfo} />
        ) : deploymentInfo ? (
          <DeployProgress deploymentInfo={deploymentInfo} error={error} />
        ) : (
          <DeployCreate />
        )}
      </motion.div>
    </>
  );
} 