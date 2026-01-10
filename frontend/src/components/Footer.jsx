const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Great! You completed {completedTasksCount} tasks
                {activeTasksCount > 0 && `, còn ${activeTasksCount} việc nữa thôi. Cố lên!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && <>Let begin finish {activeTasksCount} tasks!</>}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
