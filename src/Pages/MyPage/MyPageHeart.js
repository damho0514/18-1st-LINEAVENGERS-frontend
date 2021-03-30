import React from "react";
import MyPageNav from "./MyPageNav";
import MyPageAside from "./MyPageAside";
import MyPageNone from "./MyPageNone";
import MyPageHeartProduct from "./MyPageHeartProduct";
import { URL } from "../../config";
import "./MyPage.scss";
import Footer from "../../Components/Footer/Footer";

class MyPageHeart extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    fetch(`${URL}/mypage/favorite`, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    })
      .then(res => res.json())
      .then(res => this.setState({ productList: res.result }));
  }

  render() {
    return (
      <div className="myPage">
        <MyPageNav />
        <main className="myPageMain">
          <MyPageAside />
          {this.state.productList.length === 0 ? (
            <MyPageNone />
          ) : (
            <article className="myPageProduct">
              <div className="myPageHeartNav">
                <div className="myPageHeartNavLeft">
                  <div className="myPageHeartNavLeftL">찜한 상품</div>
                  <div className="myPageHeartNavLeftR">
                    최근 1년간의 찜한 상품이 제공됩니다.
                  </div>
                </div>
                <div className="myPageHeartNavRight">
                  <div className="myPageHeartNavRightL">쇼핑 MY</div>
                  <div className="myPageHeartNavRightM">&gt; 관심 상품</div>
                  <div className="myPageHeartNavRightR">&gt; 찜한 상품</div>
                </div>
              </div>
              {this.state.productList.map(product => {
                return this.state.productList.length === 0 ? (
                  <MyPageNone />
                ) : (
                  <MyPageHeartProduct
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  />
                );
              })}
            </article>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default MyPageHeart;
