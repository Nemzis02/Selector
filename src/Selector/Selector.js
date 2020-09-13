import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import useClickOutside from './useClickOutside';

const truncateStyles = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const useSelectorStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
  },
  selectorContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '200px',
    height: '40px',
    padding: '0 10px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },
  value: {
    ...truncateStyles,
  },
  label: {
    ...truncateStyles,
    position: 'absolute',
    top: '-25px',
    left: 0,
    maxWidth: '200px',
    color: '#404040',
  },
  options: {
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '100%',
    transform: 'translateY(100%)',
    backgroundColor: '#f5f5f5',
  },
  option: {
    ...truncateStyles,
    padding: '10px',
    userSelect: 'none',
    '&:not(:last-child)': {
      borderBottom: '1px solid #b0b0b0',
    },
    '&:hover': {
      backgroundColor: '#dbdbdb',
    },
  },
  placeholder: {
    ...truncateStyles,
    color: '#969696',
  },
});

const Selector = ({ initialValue, label, options, placeholder }) => {
  const classes = useSelectorStyles();
  const [value, setValue] = useState(initialValue || {});
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const selectorRef = useClickOutside(onClose);
  const onSelect = useCallback((option) => () => setValue(option), []);
  const textValue = value.text;
  const isDisplayPlaceholder = !textValue && placeholder;

  if (!options) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div
        ref={selectorRef}
        id='selector'
        className={classes.selectorContainer}
        onClick={isOpen ? onClose : onOpen}
      >
        {label && (
          <span id='label' className={classes.label}>
            {label}
          </span>
        )}
        {textValue && (
          <span id='value' className={classes.value}>
            {textValue}
          </span>
        )}
        {isDisplayPlaceholder && (
          <span id='placeholder' className={classes.placeholder}>
            {placeholder}
          </span>
        )}
        {isOpen && (
          <ul id='options' className={classes.options}>
            {options.map((option) => (
              <li
                key={option.id}
                className={classes.option}
                onClick={onSelect(option)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Selector.propTypes = {
  initialValue: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }),
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

export default Selector;
