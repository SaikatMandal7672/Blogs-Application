export function extractTextString(contentArray:any) {

  if (!contentArray || !Array.isArray(contentArray)) {
    return '';
  }

  return contentArray
    .map(item => {
      if (!item || !item.content || !Array.isArray(item.content)) {
        return '';
      }
      
      return item.content
        .filter((contentItem : any)=> contentItem && contentItem.type === 'text')
        .map((textItem : any)=> textItem && textItem.text ? textItem.text : '')
        .join('');
    })
    .filter(text => text && text.trim() !== '') 
    .join(' '); 
}