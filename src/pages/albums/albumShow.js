import React from 'react';
import Header from './albums/header';
import PhotoGrid from './albums/photoGrid';

/* const generatePicsumUrls = (count = 10, width = 300, height = 200) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${Math.random()}/${
      width
    }/${height}`,
    title: `Random Image ${i + 1}`
  }));
}; */

const Albums = () => {
    return (
        <div>
            <Header/>
            <div style={{marginTop: '20px', padding: '20px'}}>
                {/* <PhotoGrid photoUrls={generatePicsumUrls()}/> */}
                <PhotoGrid/>
                
            </div>
        </div>
    );
};

export default Albums;