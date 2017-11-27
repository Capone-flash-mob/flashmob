// Creates a dynamic video form
var VideoForm = class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [{ index: '', title: '', id: '' }]
    };
  }

  handleChange = (current) => ({ target }) => {
    this.setState({
      videos: this.state.videos.filter((current, target.value
    });
  }

  handleAddVideo = () => {
    this.setState({
      videos: this.state.videos.concat([{ title: '', id: '' }])
    });
  }

  handleRemoveVideo = (current) => (event) => {
    this.setState({
      videos: this.state.videos.filter((this_video, this_video_id) => current !== this_video_id)
    });
  }

  render() {

    const opts = {
      height: '150',
      width: '100%',
    };

    return (
      <div class="row">
        <div class="col-sm-5 offset-sm-1">
        {/*
          {this.state.videos.map((current_video, current) =>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="mainVideoTitle"><i>Video Title:</i></label>
                  <input type="text" class="form-control" id="mainVideoTitle" value={current_video.title} onChange={this.handleVideoTitleChange(current)}></input>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="mainVideoUrl"><i>Video URL:</i></label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="mainVideoUrl" value={current_video.url} onChange={this.handleVideoUrlChange(current)} style={{borderRadius: '4px'}}></input>
                    <span class="input-group-btn" style={{paddingLeft: '25px'}}>
                      <button type="button" class="btn btn-danger" style={{width: '34px', borderRadius: '4px'}} onClick={this.handleRemoveVideo(current)}>-</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          */}
          <div key={videos.index} class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label forName="videoTitle"><i>Video Title:</i></label>
                <input name="videoTitle" type="text" class="form-control" id="mainVideoTitle" onChange={this.handleChange(videos.index)}></input>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label forName="videoID"><i>Video URL:</i></label>
                <div class="input-group">
                  <input name="videoID" type="text" class="form-control" id="mainVideoUrl" style={{borderRadius: '4px'}} onChange={this.handleChange(videos.index)}></input>
                  <span class="input-group-btn" style={{paddingLeft: '25px'}}>
                    <button type="button" class="btn btn-success" style={{width: '34px', borderRadius: '4px'}} onClick={this.handleAddVideo}>+</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-10 offset-sm-1">
          <div class="row">
            {this.state.videos.map((current_video, current) =>
              <div class="col-sm-2">
                <h3>{current_video.title}</h3>
                <div class="mob-infobox">
                  <YouTube
                    opts={opts}
                    videoId={current_video.url}
                  />
                </div>
                <button type="button" class="btn btn-danger" style={{width: '100%', borderRadius: '4px', margin: '0px 0px 10px 0px'}} onClick={this.handleRemoveVideo(current)}>-</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}


var TitleForm = class TitleForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  render() {
    return (
      <div class="form-group">
        <label forName="title"><i>Flashmob Title:</i></label>
        {this.state.title.length < 10 ? (
          <input type="text" onChange={this.handleChange} name="title" class="form-control" id="title"></input>
        ) : (
          <input type="text" onChange={this.handleChange} name="title" class="form-control" id="title" border-color="red"></input>
        )}
      </div>
    )
  }
}
