import React from 'react';
import useCurrentProject from '../hooks/useCurrentProject';
import useWorkGroup from '../hooks/useWorkGroup';

type ProjectAsteriskProps = {
  projectid: string;
};

const ProjectAsterisk = ({ projectid }: ProjectAsteriskProps) => {
  const { selected } = useCurrentProject();
  const { updated, state } = useWorkGroup();

  if (updated && selected?.id === projectid && selected?.works !== state)
    return <>* </>;

  return <></>;
};

export default ProjectAsterisk;
