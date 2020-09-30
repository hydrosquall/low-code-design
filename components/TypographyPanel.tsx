import React from 'react';
import { useDesignTools, types } from '../lib/contexts/design-tools-context';

import Panel from './Panel';
import PanelRow from './PanelRow';

import classNameValues from '../lib/class-name-values';
import ColorPicker from './ColorPicker';

type Props = {
  onColorClick?: Function;
};

const TypographyPanel = ({ onColorClick }: Props) => {
  const {
    state,
    updateCurrentField,
    updateClassNameValue,
    dispatch,
  } = useDesignTools();
  const { textColor } = state.form;

  return (
    <Panel title="Typography" name="typography">
      <div className="p-3">
        <PanelRow label="Font Size">
          <input
            className="w-12 p-1 border"
            type="text"
            value={state.form.fontSize || ''}
            onFocus={() => updateCurrentField('fontSize')}
            onChange={(event) => {
              const { value } = event.target;

              dispatch({
                type: types.UPDATE_FORM_VALUE,
                key: 'fontSize',
                value,
              });
            }}
          />
        </PanelRow>
        <PanelRow label="Weight">
          <select
            className="p-1 border"
            value={state.fontWeight || ''}
            onChange={(event) => {
              const { value } = event.target;

              updateClassNameValue(
                state.fontWeight ? `font-${state.fontWeight}` : '',
                value ? `font-${value}` : ''
              );
            }}
          >
            <option label=" "></option>
            {[
              'hairline',
              'thin',
              'light',
              'normal',
              'medium',
              'semibold',
              'bold',
              'extrabold',
              'black',
            ].map((option) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </PanelRow>

        <PanelRow label="Color">
          <ColorPicker
            selectedColor={textColor}
            onColorClick={(color) => {
              dispatch({
                type: types.UPDATE_FORM_VALUE,
                key: 'textColor',
                value: color,
              });

              onColorClick(`text-${color}`);
            }}
          />
        </PanelRow>

        <PanelRow label="Transform">
          <select
            className="p-1 border"
            value={state.textTransform || ''}
            onChange={(event) => {
              const { value } = event.target;

              updateClassNameValue(state.textTransform, value);
            }}
          >
            <option label=" "></option>
            {classNameValues.textTransform.map((option) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </PanelRow>
      </div>
    </Panel>
  );
};

export default TypographyPanel;