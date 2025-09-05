import React, { useState, useMemo } from 'react';

export default function TaskList({ tasks, matchDate }) {
  // 1. Filter by date
  const filtered = useMemo(
    () => tasks.filter(t => t.date === matchDate),
    [tasks, matchDate]
  );

  // 2. Group tasks into [{ key, tasks }]
  const groupedTasks = useMemo(() => {
    return filtered.reduce((acc, task) => {
      const key = task.group || 'No-group';
      let groupObj = acc.find(g => g.key === key);
      if (!groupObj) {
        groupObj = { key, tasks: [] };
        acc.push(groupObj);
      }
      groupObj.tasks.push(task);
      return acc;
    }, []);
  }, [filtered]);

  // 3. Order real groups first, then No-group
  const orderedGroups = useMemo(() => [
    ...groupedTasks.filter(g => g.key !== 'No-group'),
    ...groupedTasks.filter(g => g.key === 'No-group')
  ], [groupedTasks]);

  const [expanded, setExpanded] = useState({});

  const toggleGroup = key =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  // 4. Render
  return (
    <div>
      {orderedGroups.map(({ key, tasks }) => {
        const isUngrouped = key === 'No-group';

        return (
          <div key={key} style={{ marginBottom: 16 }}>
            
            {!isUngrouped && (
              <button
                onClick={() => toggleGroup(key)}
                aria-expanded={!!expanded[key]}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '9px 10px',
                  background: '#f7f7f7',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  color: 'black'
                }}
              >
                {key}
              </button>
            )}

            
            {(isUngrouped || expanded[key]) && (
              <div
                style={{
                  padding: '8px 12px',
                  border: isUngrouped ? 'none' : '1px solid #eee',
                  marginLeft: isUngrouped ? 0 : '-10px'
                }}
              >
                {tasks.map((task, i) => (
                  <label
                    key={i}
                    htmlFor={`task-${key}-${i}`}
                    style={{
                      display: 'block',
                      margin: '4px 0',
                      color: 'black'
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`task-${key}-${i}`}
                      defaultChecked={task.done === 'true'}
                    />{' '}
                    {task.title}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}

      
      {filtered.length === 0 && <p>No tasks for {matchDate}</p>}
    </div>
  );
}

