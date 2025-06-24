import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';
import StarPicker from '../components/StarPicker';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import axios from '../api/axios.js';
import wc from '../assets/icon/wc.svg';
import check from '../assets/icon/check.svg';
import report from '../assets/icon/report.svg';
import del from '../assets/icon/delete.svg';
import droplet from '../assets/icon/droplet.svg';
import dropletHalf from '../assets/icon/droplet_half.svg';
import dropletFill from '../assets/icon/droplet_fill.svg';
import defaultImg from '../assets/icon/default_profile.svg';
import toiletImg1 from '../assets/images/toilet/toilet1.png';
import toiletImg2 from '../assets/images/toilet/toilet2.png';
import toiletImg3 from '../assets/images/toilet/toilet3.png';
import toiletImg4 from '../assets/images/toilet/toilet4.png';
import toiletImg5 from '../assets/images/toilet/toilet5.png';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 20px;
`;

const Header = styled.div`
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top: 0;
    width: 100%;
    height: 55px;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    background-color: white;
    box-sizing: border-box;
    z-index: 10;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    color: #4a95e5;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const HeaderTitle = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    pointer-events: none;
`;

const Login = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 11px;
    border: 1px solid #ddd;    
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    min-height: 1000px;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin-top: 85px;
    padding: 25px;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.div`
    display: inline-block;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const ImageRow = styled.div`
    display: flex;
    height: 200px;
    gap: 10px;
    margin-bottom: 16px;
    box-sizing: border-box;
`;

const MainImg = styled.img`
    width: 60%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    background: #bbb;
`;

const SubImgGrid = styled.div`
    width: 40%;
    height: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    box-sizing: border-box;
`;

const SubImg = styled.img`
    width: 100%;
    height: 97px;
    border-radius: 8px;
    object-fit: cover;
    background: #bbb;
`;

const Rating = styled.span`
    color: #ff5d5d;
    font-size: 16px;
    font-weight: bold;
    margin-right: 4px;
`;

const Count = styled.span`
    color: #888;
    font-size: 14px;
    margin-left: 5px;
`;

const CheckRow = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin: 10px 0px;
`;

const CheckBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 14px;
    gap: 5px;
`;

const CheckBase = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #d9d9d9;
`;

const CheckImg = styled.img`
    width: 30px;
    height: 30px;
`;

const ReviewRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0px;
    padding: 30px;
    gap: 20px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

const ReviewInput = styled.textarea`
    width: 95%;
    height: 60px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
    font-family: "pretendard-regular";
`;

const SubmitBtn = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #4a95e5;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #3b7dd8;
    }
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;    

const ProfileRow = styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 35%;
    margin-right: 10px;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
`;

const TrustPoint = styled.div`
    display: flex;
    align-items: center;
    color: #4A95E5;
    font-size: 14px;
    gap: 4px;
`;

const TrustImg = styled.img`
    width: 20px;
    height: 20px;
`;

const Date = styled.div`
    display: flex;
    color: #888;
    font-size: 14px;
    gap: 5px;
`;

const Report = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const ToiletDetail = () => {
    const reviewList = [
        {
            reviewId: 1,
            userId: 'user1',
            toiletId: 1,
            rating: 4,
            userTrust: 8,
            comment: '화장실이 깨끗하고 편리합니다.',
            reviewAt: '2025-06-23T23:31:57.941857',
        },
        {
            reviewId: 2,
            userId: 'user2',
            toiletId: 1,
            rating: 5,
            userTrust: 9,
            comment: '정말 깨끗하고 좋았습니다!',
            reviewAt: '2025-06-16T23:31:57.941857',
        },
        {
            reviewId: 3,
            userId: 'user3',
            toiletId: 1,
            rating: 3,
            userTrust: 7,
            comment: '보통이에요.',
            reviewAt: '2025-06-15T23:31:57.941857',
        },
        {
            reviewId: 4,
            userId: 'user4',
            toiletId: 1,
            rating: 4,
            userTrust: 8,
            comment: '좋은 화장실입니다.',
            reviewAt: '2025-06-14T23:31:57.941857',
        },
        {
            reviewId: 5,
            userId: 'user5',
            toiletId: 1,
            rating: 2,
            userTrust: 3,
            comment: '완전 더럽고 최악!',
            reviewAt: '2025-06-05T23:31:57.941857',
        }
    ];

    const { toiletId } = useParams(); // URI 파라미터로부터 toiletId를 가져옴
    const { isLoggedIn, logout } = useAuth();
    const [toilet, setToilet] = useState(null);
    const [showTitle, setShowTitle] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState(reviewList);
    
    const navigate = useNavigate();

    useEffect(() => {
        const id = parseInt(toiletId, 10); // URL param은 string이므로 숫자로 변환
        axios
            .post(`/api/toilet/get`, {
                toiletId: id,
            })
            .then((res) => {
                console.log('화장실 정보:', res.data);
                setToilet(res.data);
            })
            .catch((err) => console.error('화장실 불러오기 실패:', err));
    }, [toiletId]);

    useEffect(() => {
        const id = parseInt(toiletId, 10);

        const fetchReviewsWithUserData = async () => {
            try {
                // 리뷰 가져오기
                const reviewRes = await axios.post(`/api/reviews/get`, { toiletId: id });
                const fetchedReviews = reviewRes.data;

                // 리뷰마다 사용자 정보 가져오기
                const userPromises = fetchedReviews.map((review) =>
                    axios
                    .post(`/api/profile`, {
                        userId: review.userId,
                        userName: "", // 필요없지만 API 요구사항일 경우 유지
                    })
                    .then(res => ({
                        ...review,
                        userName: res.data.userName,
                        userTrust: res.data.userTrust,
                        userProfileImg: res.data.userProfileImg || defaultImg,
                    }))
                    .catch(err => {
                        console.error(`유저 정보 불러오기 실패:`, err);
                        return {
                            ...review,
                            userName: review.userId,
                            userTrust: 0,
                            userProfileImg: defaultImg,
                        };
                    })
                );

                const enrichedReviews = await Promise.all(userPromises);
                setReviews(enrichedReviews);
            } catch (err) {
                console.error('리뷰 또는 유저 정보 불러오기 실패:', err);
            }
        };

        fetchReviewsWithUserData();
    }, [toiletId]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // InfoContainer 상단 위치보다 아래로 내려오면 보여줌
            if (scrollY > 85) {
                setShowTitle(true);
            } else {
                setShowTitle(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogin = async () => {
        if (isLoggedIn) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            try {
                await axios.post(`/logout`, {}, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
            } catch (err) {
                console.warn('서버 로그아웃 실패 (무시):', err);
            } finally {
                logout();
                alert('로그아웃되었습니다.');
            }
        } else {
            navigate('/login');
        }
    };

    const handleSubmit = () => {
        if (!comment) {
            alert('리뷰를 작성해주세요.');
            return;
        }

        if (rating == 0) {
            alert('별점을 선택해주세요.');
            return;
        }

        // 리뷰 등록 API 호출
        axios
            .post(`/api/reviews/create`, {
                toiletId: toilet.toiletId,
                rating: rating,
                comment: comment,
            })
            .then((res) => {
                setReviews([...reviews, { ...res.data, date: new Date().toLocaleDateString() }]);
                setComment('');
            })
            .catch((err) => console.error('리뷰 등록 실패:', err));
    }

    const handleToiletReport = (toiletId) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios  
            .post(`/api/report/create`, {
                toiletId: toiletId,
                description: 'a',
                reportType: 'a'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                alert('신고가 접수되었습니다.');
            })
            .catch((err) => {
                console.error('신고 실패:', err);
                alert('신고에 실패했습니다. 나중에 다시 시도해주세요.');
            });
    }

    const handleReviewReport = (reviewId) => {
        if (!isLoggedIn) {
            alert('로그인 후 신고할 수 있습니다.');
            navigate('/login');
        }

        // 신고 항목 선택

        // 신고 API 호출
        axios
            .post(`/api/report/create`, {
                reviewId: reviewId,
                description: 'a',
                reportType: 'a'
            })
            .then(() => {
                alert('신고가 접수되었습니다.');
            })
            .catch((err) => {
                console.error('신고 실패:', err);
                alert('신고에 실패했습니다. 나중에 다시 시도해주세요.');
            });
    }

    // 만약 toilet이 아직 로딩 중이라면 로딩 화면을 보여줌
    if (!toilet) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <Wrapper>
            <Header>
                <Logo onClick={() => navigate("/")}>
                    <Icon src={wc} alt="Logo" />
                    ToiletGo
                </Logo>
                <HeaderTitle>
                    {showTitle && (toilet.buildingName || `화장실 ${toilet.toiletId}`)}
                </HeaderTitle>
                <Login onClick={handleLogin}>{isLoggedIn ? '로그아웃' : '로그인'}</Login>
            </Header>
            <InfoContainer>
                <TitleRow>
                    <Title>{toilet.buildingName || `화장실 ${toiletId}`}</Title>
                    <Report src={report} onClick={() => handleToiletReport(toiletId)} />
                </TitleRow>
                <InfoRow>
                    <Rating>{toilet.rating === null ? 0.0.toFixed(1) : toilet.rating.toFixed(1)}</Rating>
                    <StarRating rating={toilet.rating} size="16px" />
                    <Count>({toilet.reviewCount || 0}건)</Count>
                </InfoRow>
                <ImageRow>
                    <MainImg src={toiletImg1} alt="Main toilet img" />
                    <SubImgGrid>
                        <SubImg src={toiletImg2} alt="Sub toilet img" />
                        <SubImg src={toiletImg3} alt="Sub toilet img" />
                        <SubImg src={toiletImg4} alt="Sub toilet img" />
                        <SubImg src={toiletImg5} alt="Sub toilet img" />
                    </SubImgGrid>
                    {/* {toilet.images && toilet.images.length > 0 ? (
                        <>
                            <MainImg src={toilet.images[0]} alt="Main toilet img" />
                            <SubImgGrid>
                                {toilet.images.slice(1, 5).map((image, idx) => (
                                    <SubImg key={idx} src={image} alt={`Sub toilet img ${idx + 2}`} />
                                ))}
                            </SubImgGrid>
                        </>
                    ) : (
                        "이미지가 없습니다."
                    )} */}
                </ImageRow>
                <CheckRow>
                    <CheckBox>
                        <span>유아용 의자</span>
                        <CheckBase>
                            {toilet.hasDiaperTable && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>장애인 전용</span>
                        <CheckBase>
                            {toilet.hasHandicapAccess && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>비데</span>
                        <CheckBase>
                            {toilet.hasBidet && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                    <CheckBox>
                        <span>휴지</span>
                        <CheckBase>
                            {toilet.hasTissue && <CheckImg src={check} alt='check' />}
                        </CheckBase>
                    </CheckBox>
                </CheckRow>
                <div>{toilet.note}</div>
                <ReviewRow>
                    방문 후기를 남겨주세요!
                    <StarPicker 
                        size="40px"
                        value={rating}
                        onChange={(val) => setRating(val)}
                    />
                    <ReviewInput 
                        placeholder="리뷰를 작성해주세요. (최대 100자)"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        maxLength={100}
                    />
                    <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
                </ReviewRow>
                <ReviewList>
                    {reviews.map((review) => (
                        <div key={review.reviewId}>
                            <ProfileRow>
                                <ProfileImg src={review.userProfileImg || defaultImg} alt="profile" />
                                <ProfileInfo>
                                    <Name>{review.userName || review.userId}</Name>
                                    <TrustPoint>
                                        {review.userTrust > 7 ? (
                                            <TrustImg src={dropletFill} alt="신뢰도 높음" />
                                        ) : review.userTrust >= 4 ? (
                                            <TrustImg src={dropletHalf} alt="신뢰도 중간" />
                                        ) : (
                                            <TrustImg src={droplet} alt="신뢰도 낮음" />
                                        )}
                                        {review.userTrust}
                                    </TrustPoint>
                                </ProfileInfo>
                            </ProfileRow>
                            <Date>
                                <StarRating rating={review.rating} size="16px" />
                                {review.reviewAt.substr(0, 10)}
                            </Date>
                            <p>{review.comment}</p>
                            <Report src={report} onClick={() => handleReviewReport(review.reviewId)} />
                        </div>
                    ))}
                </ReviewList>
            </InfoContainer>
        </Wrapper>
    )
}

export default ToiletDetail;