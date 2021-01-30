"use strict";

class VideoManagerApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div className="main">
                <div className="top">
                    <div className="title">视频管理</div>
                    <div className="bar">
                        <div>
                            <div>指定扫描</div>
                            <div>上新</div>
                        </div>
                    </div>
                </div>
                <div className="view">
                    <div className="title">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">名称</div>
                        <div className="col-md-2">类型</div>
                        <div className="col-md-2">大小</div>
                        <div className="col-md-2">时长</div>
                        <div className="col-md-2">操作</div>
                    </div>
                    <div className="values">
                        <div className="value">
                            <div className="col-md-1">1</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                        <div className="value">
                            <div className="col-md-1">2</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                        <div className="value">
                            <div className="col-md-1">3</div>
                            <div className="col-md-3">送一朵小红花</div>
                            <div className="col-md-2">video/mp4</div>
                            <div className="col-md-2">1932 MB</div>
                            <div className="col-md-2">104.22 分钟</div>
                            <div className="col-md-2 options">
                                <span>删除</span>
                                <span>修改</span>
                                <span>下架</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <PageComponent position="pull-left" activeNum={1} docCount={3}/>
                    </div>
                </div>
            </div>
        );
    }
}


class NavConfigApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let that = this;
        Req({
            method: "GET",
            url: "/backend/aip/dictionary/group",
        }).then(value => {
            that.setState({nav: value})
        }).catch(({code, message}) => {
            if (401 === code) {
                that.setState(() => ({
                    token: null,
                    user: null,
                }));
                that.setState({nav: []})
                alert("请登录")
            }
        });
    }

    renderGroupList = (dictionaryGroup = []) => dictionaryGroup.map((d, i) => {
        const {id, name, groupType, values = []} = d;
        return (
            <div>
                <div className="value" data={id}>
                    <div className="col-md-1">{i + 1}</div>
                    <div className="col-md-2">{name}</div>
                    <div className="col-md-5">{groupType}</div>
                    <div className="col-md-3 options">
                        <span>修改</span>
                        <span>删除</span>
                        <span>新增子级</span>
                    </div>
                </div>
                {values.map((v, j) => {
                    const {id, name, data} = v;
                    return (
                        <div className="value" data={id}>
                            <div className="col-md-2">{i + 1} - {j + 1}</div>
                            <div className="col-md-2">{name}</div>
                            <div className="col-md-5">{data}</div>
                            <div className="col-md-3 options">
                                <span>修改</span>
                                <span>删除</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            )
    })


    render = () => {
        const {nav = []} = this.state;
        return (
            <div className="main">
                <div className="top">
                    <div className="title">导航配置</div>
                    <div className="bar">
                        <div>
                            <div>创建导航</div>
                            <div>删除导航</div>
                        </div>
                    </div>
                </div>
                <div className="view">
                    <div className="title">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">导航名称</div>
                        <div className="col-md-5">标签值</div>
                        <div className="col-md-3">操作</div>
                    </div>
                    <div className="values">
                        {this.renderGroupList(nav)}
                    </div>
                </div>
            </div>
        );
    }
}

class ToolsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="tools_app">
                <div className="left_control">
                    <div>
                        <div className="title">{"<- "}返回首页</div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">字典</div>
                        <div>
                            <div className="item">导航配置</div>
                            <div className="item">标签管理</div>
                            <div className="item">目录配置</div>
                        </div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">内容</div>
                        <div className="item active">视频管理</div>
                        <div className="item">图片管理</div>
                        <div className="item">小说管理</div>
                        <div className="item">直播管理</div>
                    </div>
                    <div className="line"/>
                    <div>
                        <div className="title">用户</div>
                        <div className="item">用户管理</div>
                    </div>
                    <div className="bottom-view">
                        <div>
                            <div className="title">v 0.0.1</div>
                        </div>
                    </div>
                </div>
                {/*<VideoManagerApp />*/}
                <NavConfigApp />
            </div>
        );
    }
}

ReactDOM.render(<ToolsApp theme="dark"/>, document.getElementById("app"));
