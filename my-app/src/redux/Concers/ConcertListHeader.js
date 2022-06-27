// ...

import { Translate } from "react-redux-i18n";

// ...

class ConcertListHeader extends Component {
 
 // ...

  renderTitle() {
    return (
      <Heading>
        <Translate value="concerts.title" />
        
        {" "}
        
        <Tag color="primary" size="large">
          {this.props.concertCount}
        </Tag>
      </Heading>
    );
  }

  // ...
  
}

// ...