import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options);
  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    if (!isEditing) {
      setWorkingText(question.question);
      setWorkingOptions(question.options);
    }

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: isEditing ? null : question.id,
      },
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...workingOptions];
    updatedOptions[index] = value;
    setWorkingOptions(updatedOptions);
  };

  const handleOptionSave = (index) => {
    if (!workingOptions[index].trim()) return;

    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index].trim(),
      },
    });
  };

  const handleOptionDelete = (index) => {
    if (workingOptions.length <= 2) return;

    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });

    setWorkingOptions(workingOptions.filter((_, i) => i !== index));
  };

  const handleAddOption = () => {
    const newOption = window.prompt('Enter new option text:');

    if (newOption && newOption.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: newOption.trim(),
        },
      });

      setWorkingOptions([...workingOptions, newOption.trim()]);
    }
  };

  const handleSave = () => {
    if (!workingText.trim()) return;

    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText.trim(),
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  const handleCancelEdit = () => {
    setWorkingText(question.question);
    setWorkingOptions(question.options);
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (!isConfirmed) return;

    dispatch({
      type: 'DELETE_QUESTION',
      payload: {
        id: question.id,
      },
    });
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {(isEditing ? workingOptions : question.options).map(
              (option, index) => (
                <li key={index} className={styles['option-item']}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        className={styles['option-input']}
                      />
                      <div className={styles['option-actions']}>
                        <button
                          onClick={() => handleOptionSave(index)}
                          className={styles['option-edit-btn']}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleOptionDelete(index)}
                          className={styles['option-delete-btn']}
                          disabled={workingOptions.length <= 2}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <span className={styles['option-text']}>{option}</span>
                  )}
                </li>
              )
            )}
          </ul>

          {isEditing && (
            <button
              onClick={handleAddOption}
              className={styles['add-option-btn']}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
