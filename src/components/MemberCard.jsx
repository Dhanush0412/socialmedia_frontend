import "../Css/GroupDetails.css";

export default function MemberCard({ member, admin }) {

    return (

        <div className="member-card">

            <div className="member-left">

                <img
                    src={
                        member.profilepic ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={member.fullname}
                />

                <div className="member-info">

                    <h3>

                        {member.fullname || member.username}

                    </h3>

                    <p>

                        {member.email}

                    </p>

                </div>

            </div>

            <div className="member-right">

                {

                    admin ?

                        <span className="admin-badge">

                            Admin

                        </span>

                        :

                        <span className="member-badge">

                            Member

                        </span>

                }

            </div>

        </div>

    );

}