import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './classes.css';


const toolbarProps = {
  options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'emoji','blockType'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline'],
    // bold: { icon: bold, className: undefined },
    // italic: { icon: italic, className: undefined },
    // underline: { icon: underline, className: undefined },
    // strikethrough: { icon: strikethrough, className: undefined },
    // monospace: { icon: monospace, className: undefined },
    // superscript: { icon: superscript, className: undefined },
    // subscript: { icon: subscript, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal','H2', 'H3'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    // icon: fontSize,
    options: [12, 14, 16, 18, 24, 28],
    className: 'front-size-select',
    // component: undefined,
    // dropdownClassName: undefined,
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered'],
    // unordered: { icon: unordered, className: undefined },
    // ordered: { icon: ordered, className: undefined },
    // indent: { icon: indent, className: undefined },
    // outdent: { icon: outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right'],
    // left: { icon: left, className: undefined },
    // center: { icon: center, className: undefined },
    // right: { icon: right, className: undefined },
    // justify: { icon: justify, className: undefined },
  },
  // colorPicker: {
  //   // icon: color,
  //   // className: undefined,
  //   // component: undefined,
  //   // popupClassName: undefined,
  //   colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
  //     'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
  //     'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
  //     'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
  //     'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
  //     'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  // },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    // link: { icon: link, className: undefined },
    // unlink: { icon: unlink, className: undefined },
  },
  emoji: {
    // icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
    '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
    '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
    '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
    '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
    '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
    '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
    '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
    '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
    '✅', '❎', '💯',
    ],
  },
  embedded: {
    // icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    // icon: image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  // remove: { icon: eraser, className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    // undo: { icon: undo, className: undefined },
    // redo: { icon: redo, className: undefined },
  },
}


class JpuriWYSIWG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      MAX_LENGTH: 20,
      remainingChar: null,
      remainingCharactersBeforeWarning: 5,
      initializeAgain: true
    };
  }

  // componentDidUpdate() {

  //   if(this.props.loadInProgress && this.state.initializeAgain) {
  //       this.setEditorState();
  //       this.setState({initializeAgain: false });
  //   }

  // }

  componentDidMount() {

    this.setState({MAX_LENGTH: this.props.maxLength });
    this.setState({remainingCharactersBeforeWarning: this.props.remainingCharactersBeforeWarning });

    if(this.props.editorState && this.props.editorState.raw['blocks']) {

          this.setEditorState();
   }

 }

 setEditorState = () => {
  let raw = this.props.editorState.raw;
  let converted = convertFromRaw(raw);

  let editorState = EditorState.createWithContent(converted, null);
  this.setState({editorState: editorState });
 }


onBlur = (editorState) => {

  this.onEditorStateChange(editorState, 'onBlur');

}

 onEditorStateChange = (editorState, event_type = 'onChange') => {

  this.setState({
   editorState: editorState
  }, () => {

    const currentContent = this.state.editorState.getCurrentContent();
    const plainText = currentContent.getPlainText('');
    this.checkLength(currentContent, plainText);

    const raw = convertToRaw(currentContent);
    this.props.saveEditorState(event_type, raw, plainText, this.props.name);


  });



};


checkLength = (currentContent, plainText) => {

  const currentContentLength = plainText.length;
  const selectedTextLength = this._getLengthOfSelectedText();


  if ((currentContentLength - selectedTextLength) >= (this.state.MAX_LENGTH - this.state.remainingCharactersBeforeWarning)) {

    let count = this.state.MAX_LENGTH - (currentContentLength - selectedTextLength);
    if(count < 0) {count = 0;}

    this.setState({remainingChar: count });
  } else {

    this.setState({remainingChar: null});
  }
}



render() {
  const { editorState } = this.state;

  return (
    <div>
    <Editor
    toolbar = { toolbarProps }
    editorState={editorState}
    handleBeforeInput={this._handleBeforeInput}
    handlePastedText={this._handlePastedText}
    wrapperStyle={{backgroundColor: 'white'}}
    toolbarClassName="toolbar-class"
    editorClassName="editor-class"
    onEditorStateChange={this.onEditorStateChange}
    onBlur={() => this.onBlur(editorState)}  />


    <div className="charLeftWarning">{this.state.remainingChar !== null ? this.state.remainingChar + ' characters left': '' }</div>

    </div>
    )
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


  if ((currentContentLength - selectedTextLength) > (this.state.MAX_LENGTH - 1)) {
    return 'handled';
  }
}

_handlePastedText = (pastedText) => {
  const currentContent = this.state.editorState.getCurrentContent();
  const currentContentLength = currentContent.getPlainText('').length;
  const selectedTextLength = this._getLengthOfSelectedText();

  if (currentContentLength + pastedText.length - selectedTextLength > this.state.MAX_LENGTH) {
    console.log('you can type max ten characters');

    return 'handled';
  }
}

}





export default JpuriWYSIWG;
