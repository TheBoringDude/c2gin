import useGroup from './useGroup';

type UseWorksProps = {
  id: string;
};
const useWorks = ({ id }: UseWorksProps) => {
  const { state } = useGroup();
  const entries = Object.entries(state);

  return entries.filter(([, { id: eId }]) => eId === id)[0];
};

export default useWorks;
