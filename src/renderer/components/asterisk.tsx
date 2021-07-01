import React from 'react';
import useCurrentProject from '../hooks/useCurrentProject';
import useGroup from '../hooks/useGroup';

type ProjectAsteriskProps = {
  projectid: string;
};

const ProjectAsterisk = ({ projectid }: ProjectAsteriskProps) => {
  const { selected } = useCurrentProject();
  const { updated, state } = useGroup();

  if (updated && selected?.id === projectid && selected?.works !== state)
    return <>* </>;

  return <></>;
};

export default ProjectAsterisk;
