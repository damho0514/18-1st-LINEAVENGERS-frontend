import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ListItem.scss";

class ListItem extends Component {
  state = {
    favoriteCheck: this.props.data.favorite ? true : false,
  };

  handleFavorite = (e, id) => {
    const { favoriteCheck } = this.state;
    this.setState({
      favoriteCheck: !favoriteCheck,
    });
  };

  render() {
    const {
      data: {
        productId,
        rating,
        thumbnailUrl,
        productName,
        price,
        review,
        type,
      },
    } = this.props;
    const { favoriteCheck } = this.state;
    const itemTag = [{ NORMAL: "", BEST: "best", NEW: "new", TOP: "top" }];
    return (
      <li className="listItem">
        <div className={`itemImg ${itemTag[type]}`}>
          <img src={thumbnailUrl} alt="상품 이미지" />
          <div className={`itemChoice ${favoriteCheck && "checked"}`}>
            <FontAwesomeIcon
              className={`choiceLike`}
              icon={faHeart}
              onClick={e => {
                this.handleFavorite(e, productId);
              }}
            />
            <FontAwesomeIcon className="chocieDetail" icon={faPlus} />
          </div>
        </div>
        <div class="titlePriceWrap">
          <div className="itemTitle">
            <p class="titleName">{productName}</p>
            <button class={`titleHeart ${favoriteCheck && "checked"}`}>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={e => {
                  this.handleFavorite(e, productId);
                }}
              />
            </button>
          </div>
          <div className="itemPrice">
            <span className="finalPrice">
              {price.sale
                ? `${Number(
                    price.normal - (price.normal * price.sale) / 100
                  ).toLocaleString()}원`
                : `${Number(price.normal).toLocaleString()}원`}
            </span>
            <span className="beforePrice">
              {price.sale !== 0 && `${Number(price.normal).toLocaleString()}원`}
            </span>
            <span className="salePercent">
              {price.sale !== 0 && `${price.sale}%`}
            </span>
          </div>
        </div>
        <div className="itemData">
          <span className="dataReview">
            리뷰 <em>{review}</em>
          </span>
          <span className="dataGrade">
            평점 <em>{Number(rating).toFixed(1)}</em>/<em>5</em>
          </span>
        </div>
      </li>
    );
  }
}

export default ListItem;
