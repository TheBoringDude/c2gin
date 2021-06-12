import React from 'react';

import useCurrentProject from '../hooks/useCurrentProject';
import useWorkGroup from '../hooks/useWorkGroup';

type ProjectAsteriskProps = {
  name: string;
};

const ProjectAsterisk = ({ name }: ProjectAsteriskProps) => {
  const { selected } = useCurrentProject();
  const { updated, state } = useWorkGroup();

  if (updated && selected.name === name && selected.works !== state)
    return <>* </>;

  return <></>;
};

export default ProjectAsterisk;
