import {
  SelectionState,
  BlockMapBuilder,
  EditorState,
  Modifier
} from 'draft-js';



export default function (editorState, style, removeStyles = []) {

  let currentContent = editorState.getCurrentContent();
  let selection = editorState.getSelection();
  let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
  let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
  let selectionIsBackward = selection.getIsBackward();

  let changes = {
    anchorOffset: 0,
    focusOffset: focusBlock.getLength()
  }

  if (selectionIsBackward) {
    changes = {
      focusOffset: 0,
      anchorOffset: anchorBlock.getLength()
    }
  }
   let selectWholeBlocks = selection.merge(changes)
   let modifiedContent = Modifier.applyInlineStyle(currentContent, selectWholeBlocks, style);
   let finalContent = removeStyles.reduce(function(content, style) {
      return Modifier.removeInlineStyle(content, selectWholeBlocks, style);
   }, modifiedContent);
   return EditorState.push(editorState, finalContent, 'change-inline-style');
}