import useCurrentProject from './useCurrentProject';

const useProjectTags = (projectid: string) => {
  const { tags } = useCurrentProject();

  return tags.filter((tag) => tag.projects?.includes(projectid));
};

export default useProjectTags;
