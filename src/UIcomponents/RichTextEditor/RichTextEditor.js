import React from 'react';
import {Editor, EditorState, ContentState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw, CharacterMetadata } from 'draft-js';
import 'draft-js/dist/Draft.css';  
import './RichTextEditor.css';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import styleWholeSelectedBlocksModifier from './styleWholeSelectedBlocksModifier';

    const MAX_LENGTH = 5000;

     class RichTextEditor extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
                          editorState: EditorState.createEmpty(),
                          remainingChar: null,
                        },
          this.focus = () => this.refs.editor.focus();
          this.onChange = this.onChange.bind(this);
          this.handleKeyCommand = this._handleKeyCommand.bind(this);
          this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
          this.toggleBlockType = this._toggleBlockType.bind(this);
          this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
          this._toggleBlockAlign = this._toggleBlockAlign.bind(this);

        }


        componentDidMount() {
          if(this.props.editorState['blocks']) {

             let raw = this.props.editorState;
             let converted = convertFromRaw(raw);

             let editorState = EditorState.createWithContent(converted, null);
             this.setState({editorState: editorState });
          }
        }



        saveEditorState = (editorState, event_type) => {

          this.setState({editorState}, () => {

              const currentContent = this.state.editorState.getCurrentContent();
              const plainText = currentContent.getPlainText('');

              this.checkLength(currentContent, plainText);

              const raw = convertToRaw(currentContent);
              this.props.saveEditorState(event_type, raw, plainText, this.props.name);

          }); 

      

        }


         onChange = (editorState) => { 

            this.saveEditorState(editorState,'onChange');
        }


         onBlur = (editorState) => { 

            setTimeout(() => { this.saveEditorState(editorState, 'onBlur') }, 100);
        }


        checkLength = (currentContent, plainText) => {

              const currentContentLength = plainText.length;
              const selectedTextLength = this._getLengthOfSelectedText();


                if ((currentContentLength - selectedTextLength) > (MAX_LENGTH - 100)) {

                      let count = MAX_LENGTH - (currentContentLength - selectedTextLength);
                      if(count < 0) {count = 0;}
                      
                      this.setState({remainingChar: count });
                } else {

                      this.setState({remainingChar: null});
                }
        }



        _handleKeyCommand(command, editorState) {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return true;
          }
          return false;
        }
        _mapKeyToEditorCommand(e) {
          if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
              e,
              this.state.editorState,
              4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
              this.onChange(newEditorState);
            }
            return;
          }
          return getDefaultKeyBinding(e);
        }
        _toggleBlockType(blockType) {
          this.onChange(
            RichUtils.toggleBlockType(
              this.state.editorState,
              blockType
            )
          );
        }
        _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }

        _toggleBlockAlign(align) {

          let editorState = this.state.editorState;

          const selection = editorState.getSelection();

          const block = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey());

        const currentStyle = getBlockAlignment(block);


         const es = styleWholeSelectedBlocksModifier(this.state.editorState, align, [currentStyle]  );

         this.saveEditorState(es);

        }




        render() {
          const {editorState} = this.state;
          // If the user changes block type before entering any text, we can
          // either style the placeholder or hide it. Let's just hide it now.
          let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }
          return (

            <div className="RichEditor-root">

            <div className="controlsContainer">

              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle} />

              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}/>


              <AlignControls
                editorState={editorState}
                onToggle={this._toggleBlockAlign}/>

            </div>

              <div className={className} onClick={this.focus}>

                <Editor
                  blockStyleFn={this.blockStyler}
                  editorState={editorState}
                  handleBeforeInput={this._handleBeforeInput}
                  handlePastedText={this._handlePastedText}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.mapKeyToEditorCommand}
                  onChange={this.onChange}
                  onBlur={() => this.onBlur(editorState)}
                  placeholder="Description..."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
              <div className="charLeftWarning">{this.state.remainingChar !== null ? this.state.remainingChar + ' characters left': '' }</div>
            </div>
          );
        }


                 _getLengthOfSelectedText = () => {
    const currentSelection = this.state.editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = this.state.editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);
      console.log(currentSelection)
      if (isStartAndEndBlockAreTheSame) {
        length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        };
      }
    }

    return length;
  }

  _handleBeforeInput = () => {
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();


        if ((currentContentLength - selectedTextLength) > (MAX_LENGTH - 1)) {
          return 'handled';
        }
   }

  _handlePastedText = (pastedText) => {
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();

    if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
      console.log('you can type max ten characters');

      return 'handled';
    }
  }

    blockStyler = (block) => {
      
      let alignment = getBlockAlignment(block);
      if (!block.getText()) {
        let previousBlock = this.state.editorState.getCurrentContent().getBlockBefore(block.getKey());
        if (previousBlock) {
          alignment = getBlockAlignment(previousBlock);
        }
      }
      return `alignment--${alignment}`;
}



}



      export default RichTextEditor;








 function getBlockAlignment(block) {
  let style = 'left';
  block.findStyleRanges(function(e) {
    if (e.hasStyle('center')) style = 'center';
    if (e.hasStyle('right')) style = 'right';
  })
  return style;
}



     
      function getBlockStyle(block) {

    switch (block.getType()) {
        case 'left':
            return 'align-left';
        case 'center':
            return 'align-center';
        case 'right':
            return 'align-right';

        case 'header-two':
            return 'align-right';

        default:
            return null;
    }         
  }
      class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }
        render() {
          let className = 'RichEditor-styleButton';
          let display = null;

          if (this.props.active) {
            className += ' RichEditor-activeButton';
          }
          if(this.props.label == 'UL' || this.props.label == 'OL') {

            display = this.props.label == 'UL' ? <FormatListBulletedIcon style={styles.controlsIcon} /> : <FormatListNumberedIcon style={styles.controlsIcon} />; 
          } else {

            display = this.props.label;
          }
          return (
            <span style={styles[this.props.style]} className={className} onMouseDown={this.onToggle}>
              {display}
            </span>
          );
        }
      }





      const ALIGN_TYPES = [
        {label: 'L', style: 'left'},
        {label: 'C', style: 'center'},
        {label: 'R', style: 'right'},
      ];

        const AlignControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const block = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey());

        const AlignStyle = getBlockAlignment(block);

        return (
          <div className="RichEditor-controls">
            {ALIGN_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === AlignStyle}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style} />
            )} </div>
        );
      };









      const BLOCK_TYPES = [
        {label: 'H1', style: 'header-two'},
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
        // {label: 'L', style: 'left'},
        // {label: 'C', style: 'center'},
        // {label: 'R', style: 'right'},
      ];
      const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        return (
          <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style} />
            )} </div>
        );
      };










      var INLINE_STYLES = [
        {label: 'B', style: 'BOLD'},
        {label: 'I', style: 'ITALIC'},
        {label: 'U', style: 'UNDERLINE'},
         ];




      const InlineStyleControls = (props) => {
        const currentStyle = props.editorState.getCurrentInlineStyle();
        
        return (
          <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </div>
        );
      };







      const styles = {

        BOLD: {

          fontWeight: 'bold'
        },

        ITALIC: {

          fontStyle: 'italic'
        },

        UNDERLINE: {

          textDecoration: 'underline'
        },

        controlsIcon: {
          color: '#999',
          marginTop: '-8px',
          marginBottom: '-5px',
          fontSize: '22px'
        }


      }